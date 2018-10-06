osascript <<EOF
tell application "iTunes"
	set currtrack to get name of current track
end tell

currtrack

EOF
