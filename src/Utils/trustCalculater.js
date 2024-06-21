class TrustEvaluator {
    constructor() {
        this.weights = {
            matKetNoi: 0.2,
            hoatDongKhongCoVideo: 0.2,
            khaiBaoBiXoa: 0.2,
            khaiBaoBiSuaDoi: 0.2,
            cameraDienTich: 0.2
        };
    }

    calculateScore(value, thresholds) {
        for (let i = 0; i < thresholds.length; i++) {
            if (value <= thresholds[i]) {
                console.log("value", value)
                console.log("thresholds", thresholds[i])
                console.log("4-i", 4 - i)
                return 4 - i;
            }
        }

        console.log("bad value: ", value)
        console.log("thresholds", thresholds)
        return 0;
    }

    convertScore(score) {
        if (score <= 0.5) {
            return 0;
        } else if (score <= 1.5) {
            return 1;
        } else if (score <= 2.5) {
            return 2;
        } else if (score <= 3.5) {
            return 3;
        } else {
            return 4;
        }
    }

    evaluateTrust(metrics) {
        const thresholds = {
            matKetNoi: [0.01, 0.02, 0.05, 0.10],
            hoatDongKhongCoVideo: [0.05, 0.2, 0.5, 0.8],
            khaiBaoBiXoa: [0.1, 0.3, 0.5, 0.8],
            khaiBaoBiSuaDoi: [0.1, 0.3, 0.6, 1],
            cameraDienTich: [1500, 3000, 4000, 6000]
        };

        let scores = {
            matKetNoi: this.calculateScore(metrics.matKetNoi / metrics.tongThoiGian, thresholds.matKetNoi),
            hoatDongKhongCoVideo: this.calculateScore(metrics.hoatDongKhongCoVideo / metrics.tongHoatDong, thresholds.hoatDongKhongCoVideo),
            khaiBaoBiXoa: this.calculateScore(metrics.khaiBaoBiXoa / metrics.tongKhaiBao, thresholds.khaiBaoBiXoa),
            khaiBaoBiSuaDoi: this.calculateScore(metrics.khaiBaoBiSuaDoi / metrics.tongKhaiBao, thresholds.khaiBaoBiSuaDoi),
            cameraDienTich: this.calculateScore(metrics.dienTich / metrics.cameraDienTich, thresholds.cameraDienTich)
        };

        const totalScore = Object.keys(scores).reduce((acc, key) => acc + this.weights[key] * scores[key], 0);
        scores.totalScore = totalScore;


        const finalScore = {
            matKetNoi: this.convertScore(scores.matKetNoi),
            hoatDongKhongCoVideo: this.convertScore(scores.hoatDongKhongCoVideo),
            khaiBaoBiXoa: this.convertScore(scores.khaiBaoBiXoa),
            khaiBaoBiSuaDoi: this.convertScore(scores.khaiBaoBiSuaDoi),
            cameraDienTich: this.convertScore(scores.cameraDienTich),
            totalScore: this.convertScore(scores.totalScore)
        };

        return finalScore;
    }
}

export default new TrustEvaluator();