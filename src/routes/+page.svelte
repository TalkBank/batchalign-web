<script>
    import "./home.css";

    let corpus_name = "";
    let lang_code = "en";
</script>

<div class="home-container">
    <div class="centering">
        <span class="callout"><span style="font-weight: 700">Howdy!</span> Let's get analyzing.</span><br />
        <span class="subtitle">Just a few questions, and we will get started analyzing your data.</span> <br /> <br />
        <div class="input-group">
            <span class="form-label">Corpus Name</span>
            <input class="form-input"
                   placeholder="my_corpus"
                   on:keypress={e => { if (e.key == " ") e.preventDefault(); console.log(e.key) }}
            bind:value={corpus_name} />
        </div>

        <div class="input-group">
            <span class="form-label">Language Code (2 letters, ISO 639-1)</span>
            <input class="form-input"
                   placeholder="my_corpus"
                   on:keypress={e => { if (e.key == " ") e.preventDefault(); console.log(e.key) }}
            bind:value={lang_code} />
        </div>

        <div class="input-group">
            <span class="form-label">Analysis Type</span>
            <select class="form-input">
                <option value="transcribe">ASR and Word Diarization</option>
                <option value="align">Word Diarization Only</option>
                <option value="morphotag">Universal Dependencies Analysis</option>
            </select>
        </div>


    </div>

    
</div>


