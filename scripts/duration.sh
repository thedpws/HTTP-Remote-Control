osascript <<EOF
tell application "iTunes"
  set d to duration of current track
  set pos to player position
end tell

set t to (d-pos)
delay t


EOF
