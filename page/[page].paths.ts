import { readdirSync } from 'fs';

const PAGE_SIZE = 10;

const data = readdirSync('./posts').filter((x: string) => x.match(/\.md$/));
const pageMax = Math.ceil(data.length / PAGE_SIZE)
const pageParams = new Array(pageMax).fill(0)
    .map((_, i) => ({ params: { page: i + 1 }}));

export default {
    paths() {
        return pageParams
    }
}