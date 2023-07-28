import { BACKEND_SERVER } from '$env/static/private';

export async function load({ params }) {
    let res = await fetch(`http://${BACKEND_SERVER}/jobs/${params.id}`, {
        method: "GET",
    });
    res = await res.json();

    return res;
}

