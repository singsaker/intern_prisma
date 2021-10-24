{pkgs ? import <nixos-unstable> {
    inherit system;
}, system ? builtins.currentSystem}:

let
  nodePackages = import ./default.nix {
    inherit pkgs system;
  };
in
nodePackages // {
  package = nodePackages.package.overrideAttrs (old: { 
    nativeBuildInputs = [ pkgs.makeWrapper ];
    installPhase = old.installPhase + "\n${pkgs.nodePackages.prisma}/bin/prisma generate\n";
    postInstall = with pkgs; ''
      wrapProgram "$out/bin/internbackend" \
        --set PRISMA_MIGRATION_ENGINE_BINARY ${prisma-engines}/bin/migration-engine \
        --set PRISMA_QUERY_ENGINE_BINARY ${prisma-engines}/bin/query-engine \
        --set PRISMA_QUERY_ENGINE_LIBRARY ${lib.getLib prisma-engines}/lib/libquery_engine.node \
        --set PRISMA_INTROSPECTION_ENGINE_BINARY ${prisma-engines}/bin/introspection-engine \
        --set PRISMA_FMT_BINARY ${prisma-engines}/bin/prisma-fmt
    '';
  });
}
