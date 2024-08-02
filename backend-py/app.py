from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = #no key here
@app.route('/generate', methods=['POST'])
def generate_readme():
    data = request.json
    repo_name = data.get('repoName', '')
    description = data.get('description', '')

    prompt = f"Generate a README file for a repository named '{repo_name}' with the following description: {description}"
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=500
    )
    
    return jsonify({'readmeContent': response.choices[0].text.strip()})

@app.route('/modify', methods=['POST'])
def modify_readme():
    data = request.json
    current_readme = data.get('currentReadme', '')
    modification_query = data.get('modificationQuery', '')

    prompt = f"Modify the following README based on the request: {modification_query}\n\nCurrent README:\n{current_readme}"
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=500
    )
    
    return jsonify({'updatedReadmeContent': response.choices[0].text.strip()})

if __name__ == '__main__':
    app.run(port=5000)
