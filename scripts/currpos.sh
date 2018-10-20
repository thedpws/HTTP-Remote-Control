osascript <<EOF
tell application "iTunes"
	set pos to get player position
end tell

pos

EOF
