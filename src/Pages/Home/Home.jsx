import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/Search/Search";
import { useParams } from "react-router-dom";
import farmImage from "../../Assets/Image/farm1.jpg";
import plantImage from "../../Assets/Image/plant.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const projectId = useParams().projectId;
  return (
    <>
      <Navbar />
      <Search projectId={projectId} />
      {/* About Us Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="border border-green-500 rounded-lg p-6 bg-green-50">
            <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Về chúng tôi</h2>
            <p className="text-lg text-gray-700 text-center">
              Đây là trang hệ thống truy xuất cho người tiêu dùng, nơi bạn có thể tìm thấy thông tin chi tiết và chính xác về các sản phẩm nông nghiệp. Chúng tôi cam kết cung cấp những thông tin minh bạch nhất để bạn có thể tin tưởng vào nguồn gốc và chất lượng của những sản phẩm mà bạn sử dụng hàng ngày.
            </p>
          </div>
        </div>
      </section>

      {/* Our Farms Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <img src={farmImage} alt="Farm" className="w-full md:w-1/2 h-auto md:h-64 rounded-lg mb-6 md:mb-0 md:mr-6 order-first md:order-first" />
          <div className="border border-green-500 rounded-lg p-6 bg-green-50 w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Các trang trại của chúng tôi</h2>
            <p className="text-lg text-gray-700 text-center mb-6">
              Các trang trại tham gia hệ thống đều tuân thủ các tiêu chuẩn cao về canh tác bền vững và chất lượng sản phẩm. Chúng tôi làm việc chặt chẽ với các nông trại để đảm bảo mọi quy trình đều minh bạch và có thể truy xuất được.
            </p>
            <div className="text-center">
              <Link to="/farm">
                <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                  Xem các trang trại
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Plants Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <img src={plantImage} alt="Plant" className="w-full md:w-1/2 h-auto md:h-64 rounded-lg mb-6 md:mb-0 md:mr-6 order-first md:order-last" />
          <div className="border border-green-500 rounded-lg p-6 bg-green-50 w-full md:w-1/2 md:mr-[20px] lg:mr-[20px]">
            <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Các cây trồng của chúng tôi</h2>
            <p className="text-lg text-gray-700 text-center mb-6">
              Các cây trồng trong hệ thống của chúng tôi bao gồm loại rau củ quả. Mỗi loại cây trồng đều được chăm sóc kỹ lưỡng để đảm bảo chất lượng và an toàn cho người tiêu dùng.
            </p>
            <div className="text-center">
              <Link to="/plant">
                <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                  Xem các cây trồng
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;
