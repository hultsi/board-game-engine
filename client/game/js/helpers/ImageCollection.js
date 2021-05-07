class ImageCollection {
    constructor() {
        this.total = 0;
        this.images = {};
    }

    load(list, callback) {
        let total = this.total;

		if (list.length > 0) {
			for(let i = 0; i < list.length; i++){
				let img = new Image();
				this.images[list[i].name] = img;
				img.addEventListener("load", () => {
					total++;
					if(total == list.length){
						callback && callback();
					}
				});
				img.src = list[i].url;
			}
		} else {
			callback && callback();
		}
    }

    get(name){
        return this.images[name] || (function(){throw "Not exist"})();
    };
}

module.exports = ImageCollection;