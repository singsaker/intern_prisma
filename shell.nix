{ pkgs ? import <nixos-unstable> {}}:

pkgs.mkShell {
  nativeBuildInputs = [
    pkgs.docker-compose
    pkgs.nodejs-12_x
    pkgs.nodePackages.prisma
    pkgs.nodePackages.node2nix
  ];
}
