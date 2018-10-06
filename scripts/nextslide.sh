osascript <<EOF
tell application "Microsoft PowerPoint"
	set ssPresentation to slide show settings of active presentation
	run slide show ssPresentation
	go to next slide slide show view of slide show window 1
end tell
EOF
