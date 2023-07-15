import { PUBLIC_BACKEND_SERVER } from '$env/static/public';

export async function load({ params }) {
    let res = await fetch(`http://${PUBLIC_BACKEND_SERVER}/jobs/${params.id}`, {
        method: "GET",
    });
    res = await res.json();

    return res;
}

