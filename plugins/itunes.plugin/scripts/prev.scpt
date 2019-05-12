tell application "iTunes" 
    set i to index of current track
    if i is not 1 then
        previous track
    end if
end tell
