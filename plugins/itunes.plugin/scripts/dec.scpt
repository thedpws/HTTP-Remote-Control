tell application "Music"
    set originalVolume to the sound volume
    repeat while the sound volume > 0
        set the sound volume to (the sound volume - 3)
    end repeat
    pause
    set the sound volume to originalVolume
end tell
