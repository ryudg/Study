// interface ComponentProps {
//   onSelectItem: (item: number) => void;
// }
function renderSelector(props) {
    /* ... */
}
var selectedId = 0;
function handleSelectItem(item) {
    selectedId = item.id;
}
renderSelector({ onSelectItem: handleSelectItem });
