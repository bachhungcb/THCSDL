import React, { useState } from 'react';
import InsertAnime from './InsertAnime';
import InsertGenres from './InsertGenres';
import InsertCharacter from './InsertCharacters';

function InsertForm() {
    const [animeId, setAnimeId] = useState(null);

    return (
        <div style={{ padding: '50px' }}>
            <InsertAnime setAnimeId={setAnimeId} />
            {animeId && <InsertGenres animeId={animeId} />}
            {animeId && <InsertCharacter animeId={animeId} />}
        </div>
    );
}

export default InsertForm;
