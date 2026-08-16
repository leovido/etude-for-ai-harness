#!/usr/bin/env bash
#
# verify-common.sh — shared pretty-output helpers.
#
# Sourced by verify.sh and run-apps.sh. Not meant to be run directly.

if [ -t 1 ]; then
  C_RESET="\033[0m"; C_RED="\033[31m"; C_GREEN="\033[32m"
  C_YELLOW="\033[33m"; C_BLUE="\033[34m"; C_BOLD="\033[1m"
else
  C_RESET=""; C_RED=""; C_GREEN=""; C_YELLOW=""; C_BLUE=""; C_BOLD=""
fi

step()  { printf "\n${C_BOLD}${C_BLUE}==> %s${C_RESET}\n" "$1"; }
info()  { printf "    %s\n" "$1"; }
ok()    { printf "${C_GREEN}✓ %s${C_RESET}\n" "$1"; }
warn()  { printf "${C_YELLOW}! %s${C_RESET}\n" "$1"; }
fail()  { printf "${C_RED}✗ %s${C_RESET}\n" "$1"; }
