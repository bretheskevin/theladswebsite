const { PrismaClient } = require('@prisma/client')
const axios = require("axios");
const prisma = new PrismaClient()

async function main() {

  const users = await prisma.users.findMany({
    where: {
      verified: 1
    }
  })

  const tasks = users.map(async (user) => {

    const memberDetails = (await axios.get(`https://pointercrate.com/api/v1/players/${user.pointercrate_id}`)).data.data
    let memberRanking = (await axios.get(`https://pointercrate.com/api/v1/players/ranking`, {
      params: {
        name_contains: memberDetails.name
      }
    })).data[0]

    if (memberRanking === undefined) {
      memberRanking = {
        rank: 99999999999,
        score: -1,
        nationality: {
          country_code: "?",
          nation: "?",
          subdivision: "?"
        }
      }
    }


    return {
      ...memberDetails,
      ...memberRanking,
      user_id: user.id,
      avatar_url: user.profile_picture_link,
      score: memberRanking.score.toFixed(2)
    }
  })

  const members = await Promise.all(tasks)
  console.log(members)
}

main()
