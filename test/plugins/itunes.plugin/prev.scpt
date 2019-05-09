tell application "iTunes" to set i to index of current track
    if i is not 1 then
        previous track
    endif
end tell
