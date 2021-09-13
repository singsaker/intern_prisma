{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  nativeBuildInputs = [ pkgs.docker-compose pkgs.nodejs-12_x ];
}
