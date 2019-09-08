
tell application "iTunes"
  set myPlaylist to (make new user playlist)
  set (name of myPlaylist) to (date string of (current date))
end tell
