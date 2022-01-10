function util1(util1) {
	console.log(__filename, "util1", util1);
}
function util2(util2) {
	console.log(__filename, "util2", util2);
}

module.exports = {
	util1,
	util2
};
