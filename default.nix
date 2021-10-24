{pkgs ? import <nixos-unstable> { }}:

let
  bnix = import ./backend/nix/override.nix { inherit pkgs; };
in
{

  backend = bnix.package;

}
