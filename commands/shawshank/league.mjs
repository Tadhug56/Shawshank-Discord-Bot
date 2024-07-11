import fetch from 'node-fetch';

const riotKey = 'RGAPI-a0454f01-b90d-4b55-a0ac-5c184940f86c';

const tagline = 'IRE';
const gameName = 'Tadhug56';

const region = 'europe';

// Main function

export async function fetchMatchData(matchNumber)
{
    const puuid = await getAccountByRiotId();
    if (puuid) 
    {
        const matchList = await getMatchList(puuid);

        if (matchList)
        {
            const matchArray = matchList
            
            // If matches are found
            if (matchArray && matchArray.length > 0)
            {
                const matchData = await getMatchData(matchArray[matchNumber]);

                const participantData = getParticipantData(matchData, puuid);
                console.log(participantData);
                return participantData;
            }
        }
    }

    return null;
}

async function getAccountByRiotId()
{
    try
    {
        const response = await fetch(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagline)}?api_key=${riotKey}`);
        if (!response.ok)
        {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data.puuid;
    }
    
    catch (error)
    {
        console.error('Error:', error.message);
    }
};

async function getMatchList(puuid)
{
    try
    {
        const response = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${riotKey}`)

        if (!response.ok)
        {
            throw new Error(`HTTP error! Status : ${response.status}`);
        }

        const data = await response.json();

        return data;
    }

    catch(error)
    {
        console.error('Error:', error.message);
    }
};

async function getMatchData(matchId)
{
    try
    {
        const response = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${riotKey}`);

        if (!response.ok)
        {
            throw new Error(`HTTP error! Status : ${response.status}`);
        }

        const data = await response.json();

        return data;
    }

    catch(error)
    {
        console.error('Error:', error.message);
    }
};

async function getParticipantData(matchData, targetPuuid)
{
    try
    {
        const participants = matchData.info.participants;
        let targetParticipant;

        participants.forEach(participant =>
        {
            if (participant.puuid === targetPuuid)
            {
                targetParticipant = participant;
                console.log(targetParticipant);
            }
        });

        return {
            name: gameName,
            kills: targetParticipant.kills,
            deaths: targetParticipant.deaths,
            assists: targetParticipant.assists,
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp1dEKTURorvg6H9kfbe9N9nBFMALoaRkYQQ&s'
        };

    }

    catch(error)
    {
        console.error('Error:', error.message);
    }
    
};

fetchMatchData();
