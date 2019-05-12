#!/bin/bash
for file in $(ls *.scpt)
do
    osacompile -o "../$file" $file
done
