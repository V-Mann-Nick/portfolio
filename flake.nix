{
  description = "Envrionment for the Portfolio Monorepo";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = {
    nixpkgs,
    systems,
    ...
  }: let
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    devShells =
      forEachSystem
      (
        system: let
          pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_21
              pkgs.nodejs_21.pkgs.pnpm
            ];
            # Sync the actual version of pnpm with the version in package.json
            shellHook = ''
              ${pkgs.jq}/bin/jq ".packageManager = \"pnpm@$(pnpm --version)\"" package.json | ${pkgs.moreutils}/bin/sponge package.json
            '';
          };
        }
      );
    formatter = forEachSystem (system: nixpkgs.legacyPackages.${system}.alejandra);
  };
}
