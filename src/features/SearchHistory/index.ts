import useCachedRef from "@/shared/composables/useCachedRef";
import type {ItemTypes, PartialSearchResult} from "@spotify/web-api-ts-sdk";

type Item = NonNullable<PartialSearchResult[`${Exclude<ItemTypes, 'track'>}s`]>['items'][number];

const history = useCachedRef<Item[]>('searchHistory', [], {
    expectedTypes: ['array']
});

function addToHistory(item: Item) {
    if (history.value.find(value => value.id === item.id)) {
        return;
    }

    if (history.value.length > 10) {
        history.value.splice(0, 1);
    }

    history.value.push(item);
}

function getHistory() {
    return history.value.slice().reverse();
}

function removeFromHistory(index: number) {
    history.value.splice(index, 1);
}

function clearHistory() {
    history.value = [];
}

export {addToHistory, getHistory, removeFromHistory, clearHistory};