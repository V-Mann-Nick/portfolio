{
  description = "Envrionment for the Portfolio Monorepo";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
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
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
    nodejs = forEachSystem (system: nixpkgs.legacyPackages.${system}.nodejs_21);
    pnpm = forEachSystem (system: nixpkgs.legacyPackages.${system}.nodejs_21.pkgs.pnpm);
  in {
    # This is just for learning and testing. Not actually used - builds take too long.
    packages = forEachSystem (system: {
      portfolio = pnpm2nix.packages.${system}.mkPnpmPackage {
        src = ./.;
        nodejs = nodejs.${system};
        pnpm = pnpm.${system};
        installInPlace = true;
        extraBuildInputs = [
          nixpkgs.legacyPackages.${system}.vips
        ];
        script = "--filter portfolio build --outDir ../../dist";
      };
    });
    devShells =
      forEachSystem
      (
        system: let
          pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = pkgs.mkShell {
            packages = [
              nodejs.${system}
              pnpm.${system}
            ];
            # Sync the actual version of pnpm with the version in package.json
            shellHook = ''
              jq=${pkgs.jq}/bin/jq
              sponge=${pkgs.moreutils}/bin/sponge
              $jq ".packageManager = \"pnpm@${pnpm.${system}.version}\"" package.json | $sponge package.json
              $jq ".engines.pnpm = \"${pnpm.${system}.version}\"" package.json | $sponge package.json
              $jq ".engines.node = \"${nodejs.${system}.version}\"" package.json | $sponge package.json
            '';
          };
        }
      );
    formatter = forEachSystem (system: nixpkgs.legacyPackages.${system}.alejandra);
  };
}
