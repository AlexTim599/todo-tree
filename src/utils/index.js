
export const buildTree = (data) => {
    const { labels, entityLongIds, parentEntityLongIds } = data;

    return labels.map((item, index) => {
        return {

            content: item,
            id: entityLongIds[index],
            parentId: parentEntityLongIds[index] === -1 ? null : parentEntityLongIds[index],
        }
    });
}

