#!/bin/sh
# Build koka-redex documentation site
# Requires: madoko, koka, koka-community/html

set -e
cd "$(dirname "$0")"

HTML_LIB="${HTML_LIB:-../../../../koka-community/html}"
STD_LIB="${STD_LIB:-../../../../koka-community/std}"

koka -e -i"$HTML_LIB" -i"$STD_LIB" build.kk
