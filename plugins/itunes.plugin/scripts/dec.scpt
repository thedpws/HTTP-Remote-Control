tell application "Music"
    set originalVolume to the sound volume
    repeat while the sound volume > 0
        set the sound volume to (the sound volume - 1)
        delay 0.002
    end repeat
    pause
    set the sound volume to originalVolume
end tell
