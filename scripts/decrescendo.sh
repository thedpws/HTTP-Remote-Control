osascript <<EOF
tell application "iTunes"
  repeat while the sound volume > 0
    set the sound volume to (the sound volume - 1)
    delay 0.002
  end repeat
  pause
end tell
EOF
