<script>
    export let data;
    import { PUBLIC_BACKEND_SERVER } from '$env/static/public';


    const downloadURI = (uri, name) => {
        const link = document.createElement("a");
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const download = () => {
        downloadURI(`http://${PUBLIC_BACKEND_SERVER}/download/${data.id}`);
    }

</script>

{#if data.status == "processing"}
    <span class="callout"><span style="font-weight: 700">{data.name}</span> is processing... </span><br />
    <span class="subtitle">The download link to your processed files will be available at the URL of this page once we are ready. Feel free to <a href={window.location.href} style="color: var(--blue); border-bottom: 1px dotted var(--blue)">save it for later</a>.</span>

    <br />
{:else if data.status == "error"}
    <span class="callout">Oh no! <span style="font-weight: 700">{data.name}</span> has failed processing. </span><br />
    <span class="subtitle">Please don't hesitate to reach out for any debugging help. Here is some debug information that you may find helpful.</span>
    <br />
    <br />
    <pre style="font-size: 10px;">
    {data.payload}
    </pre>
{:else if data.status == "not_found"}
    <span class="callout"><span style="font-weight: 700">Bad Request!</span> Job ID not found. </span><br />
    <span class="subtitle">We haven't seen this job. Perhaps you got the URL wrong?</span>
{:else if data.status == "success"}
    <span class="callout"><span style="font-weight: 700">{data.name}</span> has finished processing! </span><br />
    <span class="subtitle">Tap the button below to download your processed files.</span>
    <br />
    <button class="action-button mt-5 float-right" on:click={download}>Download</button>
    <!-- on:click={onSubmit} -->

{/if}


<br />
<span class="form-label mt-3" style="padding:0; font-size: 9px; font-weight:300; transform: translateY(-8px)">TalkBank Batchalign | Experimental Build</span>


