import fetch from 'node-fetch';

const riotKey = 'RGAPI-35ff0fc4-6f80-41ec-b83f-474c7e6bf4a4';

const tagline = 'IRE';
const gameName = 'Tadhug56';

const region = 'europe';

const getAccountByRiotId = async () =>
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
    }
    
    catch (error)
    {
        console.error('Error:', error.message);
    }
};

getAccountByRiotId();
