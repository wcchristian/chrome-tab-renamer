#!/usr/bin/env bash
version=`cat version.txt`
builddir='builds'
name=chrome-tab-renamer_${version}

mkdir ${builddir}
zip ${builddir}/${name} -@ < build.txt