import fetch from 'node-fetch';

const riotKey = 'RGAPI-a0454f01-b90d-4b55-a0ac-5c184940f86c';

const tagline = 'IRE';
const gameName = 'Tadhug56';

const region = 'europe';

// Main function

async function main()
{
    const puuid = await getAccountByRiotId();
    if (puuid) 
    {
        const matchList = await getMatchList(puuid);

        if (matchList)
        {
            const matchArray = matchList

            if (matchArray && matchArray.length > 0)
            {
                const matchData = await getMatchData(matchArray[0]);

                getParticipantData(matchData, puuid);
            }
        }
    }
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
        console.log(data);

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

        console.log(data);

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

        console.log(data);

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
            console.log('Puuid : ', participant.puuid);
            if (participant.puuid === targetPuuid)
            {
                targetParticipant = participant;
            }
        });

        console.log(targetParticipant);

    }

    catch(error)
    {
        console.error('Error:', error.message);
    }
    
};

main();
