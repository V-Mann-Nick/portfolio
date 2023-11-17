{
  description = "Envrionment for the Portfolio Monorepo";

  nixConfig.sandbox = "relaxed";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    pnpm2nix = {
      url = "github:nzbr/pnpm2nix-nzbr";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    nixpkgs,
    systems,
    pnpm2nix,
    ...
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    nodejs = pkgs.nodejs_21;
    pnpm = pkgs.nodejs_21.pkgs.pnpm;
    mkPnpmPackage = pnpm2nix.packages.${system}.mkPnpmPackage;
  in {
    # This is just for learning and testing. Not actually used - builds take too long.
    packages.${system} = rec {
      portfolio = mkPnpmPackage {
        inherit nodejs pnpm;
        src = ./.;
        installInPlace = true;
        extraBuildInputs = [pkgs.vips];
        script = "build --no-cache --filter portfolio -- --outDir ../../dist";
        # Allow build to access internet
        __noChroot = true;
      };
      image = pkgs.dockerTools.buildImage {
        name = "portfolio";
        tag = "latest";
        config = {
          Cmd = [
            "${pkgs.caddy}/bin/caddy"
            "file-server"
            "--root"
            portfolio
          ];
        };
      };
    };
    devShells.${system}.default = pkgs.mkShell {
      packages = [
        nodejs
        pnpm
        pkgs.caddy
      ];
      # Sync the actual version of pnpm with the version in package.json
      shellHook = ''
        jq=${pkgs.jq}/bin/jq
        sponge=${pkgs.moreutils}/bin/sponge
        $jq ".packageManager = \"pnpm@${pnpm.version}\"" package.json | $sponge package.json
        $jq ".engines.pnpm = \"${pnpm.version}\"" package.json | $sponge package.json
        $jq ".engines.node = \"${nodejs.version}\"" package.json | $sponge package.json
      '';
    };
    formatter.${system} = pkgs.alejandra;
  };
}
