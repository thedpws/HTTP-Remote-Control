osascript <<EOF
tell application "iTunes"
	set dur to get duration of current track
end tell

dur

EOF
