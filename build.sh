#!/usr/bin/env bash
version='1_0_0'
builddir='builds'
name=chrome-tab-renamer_${version}

mkdir ${builddir}
cd src
zip -r ../${builddir}/${name} *