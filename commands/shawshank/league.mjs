import fetch from 'node-fetch';

const riotKey = 'RGAPI-a0454f01-b90d-4b55-a0ac-5c184940f86c';


const region = 'europe';

// Main function

export async function fetchMatchData(matchNumber, username, tagline)
{
    const gameName = username;
    const tagLine = tagline;

    if(matchNumber === null || username === null || tagline === null)
    {
        return;
    }

    const puuid = await getAccountByRiotId(gameName, tagLine);

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

                const participantData = getParticipantData(matchData, puuid, username);
                return participantData;
            }
        }
    }

    return null;
}

async function getAccountByRiotId(gameName, tagline)
{
    try
    {
        const response = await fetch(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagline}?api_key=${riotKey}`);
        if (!response.ok)
        {
            throw new Error(`HTTP error! getAccountByRiotId Status: ${response.status}`);
        }

        const data = await response.json();

        return data.puuid;
    }
    
    catch (error)
    {
        console.error('Error:!', error.message);
    }
};

async function getMatchList(puuid)
{
    try
    {
        const response = await fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${riotKey}`)

        if (!response.ok)
        {
            throw new Error(`HTTP error!! Status : ${response.status}`);
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
            throw new Error(`HTTP error!!! Status : ${response.status}`);
        }

        const data = await response.json();

        return data;
    }

    catch(error)
    {
        console.error('Error:', error.message);
    }
};

async function getParticipantData(matchData, targetPuuid, username)
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
            }
        });

        return {
            name: username,
            kills: targetParticipant.kills,
            deaths: targetParticipant.deaths,
            assists: targetParticipant.assists,
            championName: targetParticipant.championName,
            championImage: `https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${targetParticipant.championName}.png`,
            imageUrl: `https://ddragon.leagueoflegends.com/cdn/14.13.1/img/profileicon/${targetParticipant.profileIcon}.png`
        };

    }

    catch(error)
    {
        console.error('Error:', error.message);
    }
    
};
