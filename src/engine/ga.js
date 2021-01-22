import tf from '@tensorflow/tfjs';

class ImageGA {
	constructor(verbose=true) {
		this.verbose = verbose;
	}

	log(message) {
		if (this.verbose) {
			console.log(message);
		}	
	}

	fit(image) {
		best_outputs = []

        // Genesis
        new_population = self.genesis(image)

        // Evolution
        for(let generation = 0; generation < this.number_of_generations; generation++) {
					fitness = self.fitness_function(image, new_population)
            
            if (generation % 100 == 0) {
							this.log(`Generation = ${generation}, Best fitness = ${Math.round(np.min(fitness),10)}`);
						}

            best_outputs.push(Math.round(tf.min(fitness),10))
						parents = this.biased_selection(new_population, fitness, this.number_of_parents)
						
						offspring_size = [this.population_size[0]-parents.shape[0], new_population.shape[1]]
						offspring_recombination = this.recombination(parents, offspring_size)

            offspring_mutation = this.mutation(offspring_recombination)
            new_population.slice([0, parents.shape[0]], :] = parents
            new_population[parents.shape[0]:, :] = offspring_mutation
            
            // Check for convergence
            if self.is_converged(best_outputs):
                break	
				}

        # Results
        if self.verbose:
            print("\nThe population of the last generation: ")
            print(new_population)

        fitness = self.fitness_function(image, new_population)
        best_match_idx = np.where(fitness == np.max(fitness))

        if self.verbose:
            print("Best solution: ", new_population[best_match_idx, :])

        self.solution = new_population[best_match_idx, :][0][0]

        # Chart
        plt.plot(best_outputs)
        plt.xlabel("Generation")
        plt.ylabel("Cost")
        plt.show()
	}

    def fitness_function(self, image, pop):
        fitness = np.zeros(len(pop))
        for i, solution in enumerate(pop):
            fitness[i] = np.sqrt(np.sum(np.square(image - solution)))
        return fitness
    
    def genesis(self, image):
        n = image.shape[0]
        population_size = (self.number_of_solutions, n)
        return np.random.randint(256, size=population_size)
    
    def biased_selection(self, pop, fitness, num_parents):
        sorted_fitness_args = np.argsort(fitness)
        return pop[sorted_fitness_args[:num_parents], :]

    def recombination(self, parents, offspring_size):
        offspring = np.empty(offspring_size)
        indices = np.arange(offspring_size[1])
        for k in range(offspring_size[0]):
            # Choose random point
            intersection = np.random.randint(offspring_size[1])            
            # Choose random parents
            parent1_idx, parent2_idx = np.random.randint(parents.shape[0], size=2)
            
            parent1_indices = np.random.choice(indices, size=intersection, replace=False)
            parent2_indices = np.delete(indices, parent1_indices)

            offspring[k, parent1_indices] = parents[parent1_idx, parent1_indices]
            offspring[k, parent2_indices] = parents[parent2_idx, parent2_indices]
        return offspring
    
    def mutation(self, offspring_recombination):
        # Determine amount of mutatations
        m, n = offspring_recombination.shape
        n_mutations = int(np.round(self.mutation_rate * n))        
        for idx in range(m):
            offspring = offspring_recombination[idx]
            random_value = np.random.randint(256, size=n_mutations)
            random_indices = np.random.randint(n, size=n_mutations)
            offspring_recombination[idx, random_indices] = random_value
        return offspring_recombination
}