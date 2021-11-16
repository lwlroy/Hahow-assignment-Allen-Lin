describe('SWAPI Test', () => {
    
        it('Should have 9 different species in episode_6 "Return of the Jedi"', () => 
        {
            const title = 'Return of the Jedi'
            search_film_by_title(title).then((response) => 
            {
                expect(response.status).to.eq(200)
                const episode = response.body.results[0].episode_id
                expect(episode).to.eq(6)
                const species = response.body.results[0].species
                expect(species).to.have.lengthOf(9)
                cy.log(`${species.length} different races in episode 6`)
            })
        })
    
        it('Should films list ordered by episode_id ASC', () => {
            all_Films().then((response) => {
                const films = response.body.results
                const actualResult = sort_by_episode_id_ASC(films)
                const expectResult = [
                    [1, "The Phantom Menace"],
                    [2, "Attack of the Clones"],
                    [3, "Revenge of the Sith"],
                    [4, "A New Hope"],
                    [5, "The Empire Strikes Back"],
                    [6, "Return of the Jedi"]
                ]
                actualResult.forEach((element) => {
                    cy.log(`Episode: ${element[0]}, Title: ${element[1]}`)
                })
                expect(JSON.stringify(actualResult)).to.eq(JSON.stringify(expectResult))
            })
        })
    
        it('Should list vehicles max atmosphering speed is over 1000', ()=> {
            all_Vehicles().then((response) => {
                const vehicles = response.body.results
                const actualResult = vehicles_max_atmosphering_speed_over_1000(vehicles)
                const expectResult = [
                    ["T-16 skyhopper", "1200"],
                    ["TIE/LN starfighter", "1200"],
                    ["Storm IV Twin-Pod cloud car", "1500"]
                ]
                actualResult.forEach((element) => {
                    cy.log(`Vehicle name: ${element[0]}, Max atmosphering speed: ${element[1]}`)
                })
                expect(JSON.stringify(actualResult)).to.eq(JSON.stringify(expectResult))
            })
        })
    
    })
    function search_film_by_title(title) {
        return cy.request(`https://swapi.dev/api/films?search=${title}`)   
    }
    
    
    function all_Films() {
        return cy.request('https://swapi.dev/api/films') 
    }
    
    function sort_species(speciesorder){  
        const result = []
        speciesorder.forEach((element) => {
            result.push([
                element.species
            ])
        })
        return result
    }
    function sort_by_episode_id_ASC(films) 
    {  
        const result = []
        films.forEach((element) => {
            result.push([
                element.episode_id,
                element.title
            ])
        })
        result.sort((a, b) => {
            return a[0] - b[0]
        })
        return result
    }
    function all_Vehicles() {
        return cy.request('https://swapi.dev/api/vehicles')
    }
    function vehicles_max_atmosphering_speed_over_1000(vehicles) {  
        const result = []
        vehicles.forEach((element) => {
            if(element.max_atmosphering_speed > 1000) {
                result.push([
                    element.name,
                    element.max_atmosphering_speed
                ])
            }
        })
        return result 
    }