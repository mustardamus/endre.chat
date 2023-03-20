# This is here so prisma works with NixOS
# load via `nix-shell`, then do `prisma` commands
# https://github.com/prisma/prisma/issues/3026#issuecomment-1439131599
{ pkgs ? import <nixpkgs> {} }:

let lib = pkgs.lib;

in pkgs.mkShell (with pkgs; {
	buildInputs = [
		nodejs
		openssl
	];

	shellHook = ''PATH="$PWD/node_modules/.bin:$PATH"'';

	PRISMA_MIGRATION_ENGINE_BINARY = "${prisma-engines}/bin/migration-engine";
	PRISMA_QUERY_ENGINE_BINARY = "${prisma-engines}/bin/query-engine";
	PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
	PRISMA_INTROSPECTION_ENGINE_BINARY = "${prisma-engines}/bin/introspection-engine";
	PRISMA_FMT_BINARY = "${prisma-engines}/bin/prisma-fmt";
})
