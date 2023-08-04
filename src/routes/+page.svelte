<script>
    import "./home.css";
    import DropFile from '@svelte-parts/drop-file'

    import { PUBLIC_BACKEND_SERVER } from '$env/static/public';

    let corpus_name = "";
    let lang_code = "en";
    let mode = "";
    let key = "";
    if (typeof window !== 'undefined') {
        key = localStorage.getItem("key");
    }
    let file_over = false;
    let files = [];

    let loading = false;

    const onDrop = (f) => {
        files = f;
    }

    const onSubmit = async () => {
        // if we don't have a mode selection, return nothing
        if (mode == "") return;

        // if we have a key, persist it
        if (key && key != "") {
            localStorage.setItem("key", key);
        }

        // set loading state
        loading = true;

        // assemble new form data
        const formData = new FormData();

        files.forEach(f => formData.append("input", f));
        formData.append("name", corpus_name);
        formData.append("command", mode);
        formData.append("lang", lang_code);
        formData.append("key", key);

        // call the command!
        let res = await fetch(`http://${PUBLIC_BACKEND_SERVER}/submit`, {
            method: "POST",
            body: formData
        });
        res = await res.json();

        loading = false;

        window.location.href=`./${res.id}`;
    }

</script>

        {#if !loading}
        <span class="callout"><span style="font-weight: 700">Howdy!</span> Let's get analyzing.</span><br />
        <span class="subtitle">Please answer the following questions to begin our analysis.</span>
        {:else}
        <span class="callout"><span style="font-weight: 700">Hang on tight!</span> Uploading your files...</span><br />
        <span class="subtitle">Do not navigate away from this page or close it. <br />This will only take at most a few minutes.</span>
        {/if}


        <br /> <br />

        {#if !loading}
        <div class="input-group">
            <span class="form-label">Corpus Name</span>
            <input class="form-input"
                   required
                   placeholder="my_corpus"
                   on:keypress={e => { if (e.key == " ") e.preventDefault()}}
            bind:value={corpus_name} />
        </div>

        <div class="input-group">
            <span class="form-label">Language Code (2 letters, ISO 639-1)</span>
            <input class="form-input"
                   required
                   placeholder="my_corpus"
                   on:keypress={e => { if (e.key == " ") e.preventDefault(); console.log(e.key) }}
            bind:value={lang_code} />
        </div>

        <div class="input-group">
            <span class="form-label">Analysis Type</span>
            <select class="form-input form-select" bind:value={mode} required>
                <option value="" disabled selected hidden class="form-select-placeholder">Tap to select an option...</option>
                <option value="transcribe">ASR and Word Diarization</option>
                <option value="align">Word Diarization Only</option>
                <option value="morphotag">Universal Dependencies Analysis</option>
            </select>
        </div>

        {#if mode == "transcribe"}
        <div class="input-group">
            <span class="form-label">Rev.AI API Key</span>
            <input class="form-input"
                   required
                   placeholder="place key here"
                   on:keypress={e => { if (e.key == " ") e.preventDefault()}}
            bind:value={key} />
        </div>
        {/if}


        <div class="input-group">
            <span class="form-label">Input Files</span>
            {#if files.length > -1}
                <div class="">
                {#each files as f, indx}
                    <div class="form-file"><i class="fa-regular fa-file pr-1 ml-1" /> <span style="max-width: 90%; display: inline-block">{f.name}</span> <i class="fa-solid fa-xmark cursor-pointer hover:text-red-600 transition-all" style="float:right; transform: translate(-5px, 3px)" on:click={()=> { files.splice(indx,1); files=files }}/></div>
                {/each}
                </div>
            {/if}
            <DropFile
                onDrop={onDrop}
                onEnter={() => file_over = true}
                onLeave={() => file_over = false}>
                <div class={"input-dropzone "+(file_over?"active":"")}>
                    Drop your input files here, or tap to select files.
                </div>
            </DropFile>
        </div>
        <div class="input-group mt-4" style="display: flex; align-items:flex-begin; justify-content: space-between">
            <div>
                <span class="form-label" style="padding:0; font-size: 9px; font-weight:300; transform: translateY(-15px)">TalkBank Batchalign | Experimental Build</span>
            </div>
            <button class="action-button" style="float:right; transform: translateY(15px)" on:click={onSubmit}>Submit</button>
        </div>
        {/if}

