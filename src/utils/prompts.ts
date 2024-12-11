export const twitterPrompt = (topic: string) => `Generate a twitter thread on the topic ${topic}`

export const linkedinPrompt = (topic: string) => `Generate a LinkedIn post on the topic ${topic}`

export const instagramPrompt = (options: string) => `Generate a instagram caption based on the above photo ${options ? `along with ${options}` : ''}`


export const generatedPromptPrefix = (contentType: string, topic: string) => {
    switch (contentType) {

        case 'twitter':
            return twitterPrompt(topic)

        case 'linkedIn':
            return linkedinPrompt(topic)
        case 'instagram':
            return instagramPrompt(topic)

        default:
            return topic
    }

}