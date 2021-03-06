tell application "Music"
    set currtrack_name to get name of current track
    log currtrack_name
    set currtrack_duration to get duration of current track
    log currtrack_duration
    set currtrack_pos to get player position
    log currtrack_pos
    set player_state to get player state
    log player_state
    set player_volume to get the sound volume
    log player_volume
    set nexttrack_name to get name of track ((index of current track) + 1) of current playlist
    log nexttrack_name
    set output to (currtrack_name & "$" & currtrack_duration & "$" & currtrack_pos & "$" & player_state & "$" & player_volume & "$" & nexttrack_name)
    do shell script "echo " & quoted form of output
end tell
