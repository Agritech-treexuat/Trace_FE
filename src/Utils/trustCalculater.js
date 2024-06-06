class TrustEvaluator {
    constructor() {
        this.weights = {
            matKetNoi: 0.3,
            hoatDongKhongCoVideo: 0.2,
            khaiBaoBiXoa: 0.2,
            khaiBaoBiSuaDoi: 0.2,
            cameraDienTich: 0.1
        };
    }

    calculateScore(value, thresholds) {
        for (let i = 0; i < thresholds.length; i++) {
            if (value <= thresholds[i]) {
                return 4 - i;
            }
        }
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
            hoatDongKhongCoVideo: [0.1, 0.2, 0.5, 1.0],
            khaiBaoBiXoa: [0.01, 0.02, 0.05, 0.10],
            khaiBaoBiSuaDoi: [0.01, 0.02, 0.05, 0.10],
            cameraDienTich: [0.05, 0.1, 0.15, 0.2]
        };

        let scores = {
            matKetNoi: this.calculateScore(metrics.matKetNoi / metrics.tongThoiGian, thresholds.matKetNoi),
            hoatDongKhongCoVideo: this.calculateScore(metrics.hoatDongKhongCoVideo / metrics.tongHoatDong, thresholds.hoatDongKhongCoVideo),
            khaiBaoBiXoa: this.calculateScore(metrics.khaiBaoBiXoa / metrics.tongKhaiBao, thresholds.khaiBaoBiXoa),
            khaiBaoBiSuaDoi: this.calculateScore(metrics.khaiBaoBiSuaDoi / metrics.tongKhaiBao, thresholds.khaiBaoBiSuaDoi),
            cameraDienTich: this.calculateScore(metrics.camera / metrics.dienTich, thresholds.cameraDienTich)
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