import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Danh sách trái cây mẫu
const fruitData = [
  { id: '1', name: 'Táo', vietnamese: 'Táo', image: 'https://www.vinmec.com/static/uploads/20210303_090819_727308_an_tao_co_tot_cho_s_max_1800x1800_jpg_c45de8f19f.jpg' },
  { id: '2', name: 'Chuối', vietnamese: 'Chuối', image: 'https://storage.googleapis.com/onelife-public/blog.onelife.vn/2023/11/5cbb402d-1.png' },
  { id: '3', name: 'Cam', vietnamese: 'Cam', image: 'https://product.hstatic.net/1000309753/product/cam-4_b1be682b1df24b098c3a086405b46e7e_596e3b20f1d04f7796e8e342bbe85aa5_master.jpg' },
  { id: '4', name: 'Dâu tây', vietnamese: 'Dâu tây', image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_1_17_638410957656200345_cach-an-dau-tay-1.jpg' },
  { id: '5', name: 'Xoài', vietnamese: 'Xoài', image: 'https://suckhoedoisong.qltns.mediacdn.vn/Images/duylinh/2019/08/15/8-loi-ich-it-biet-cua-xoai1565855128.jpg' },
  { id: '6', name: 'Dưa hấu', vietnamese: 'Dưa hấu', image: 'https://product.hstatic.net/1000282430/product/seedless-watermelon-around-2.5kg-whole-fruit_23a860613aa94413aca16b9d766f6291_grande.jpg' },
  { id: '7', name: 'Thơm', vietnamese: 'Thơm', image: 'https://shop.annam-gourmet.com/pub/media/catalog/product/i/t/item_F148770_a984.jpg' },
  { id: '8', name: 'Nho', vietnamese: 'Nho', image: 'https://cdn.tgdd.vn/Products/Images/8788/320858/bhx/nho-xanh-ninh-thuan-500g-202312291331094358.jpg' },
  { id: '9', name: 'Cherry', vietnamese: 'Anh đào', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Italienische_S%C3%BC%C3%9Fkirschen.JPG' },
  { id: '10', name: 'Dừa', vietnamese: 'Dừa', image: 'https://hoangphatfruit.com/vnt_upload/product/02_2022/sp3.png' },
];

const StyleSheetSpinner = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Lọc gợi ý autocomplete (tối đa 8 để dropdown không quá dài)
  const suggestions = useMemo(() => {
    if (query.trim().length < 1) return [];

    return fruitData
      .filter(item =>
        item.vietnamese.toLowerCase().includes(query.toLowerCase()) ||
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);
  }, [query]);

  const handleSearch = (text) => {
    setQuery(text);
    setShowSuggestions(true); // Hiện gợi ý khi gõ
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const handleSelectSuggestion = (item) => {
    setQuery(item.vietnamese);
    setShowSuggestions(false); // Ẩn dropdown sau khi chọn
    // Grid sẽ tự cập nhật nhờ filteredFruits dựa trên query mới
  };

  // Render item gợi ý trong dropdown
  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSelectSuggestion(item)}
    >
      <Text style={styles.suggestionText}>
        {item.vietnamese} <Text style={styles.suggestionLatin}>({item.name})</Text>
      </Text>
    </TouchableOpacity>
  );

  // Render item trái cây trong lưới
  const renderFruitItem = ({ item }) => (
    <TouchableOpacity
      style={styles.fruitCard}
      onPress={() => alert(`Bạn chọn: ${item.vietnamese}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.fruitImage}
        resizeMode="cover"
      />
      <Text style={styles.fruitName}>{item.vietnamese}</Text>
      <Text style={styles.fruitLatin}>({item.name})</Text>
    </TouchableOpacity>
  );

  // Danh sách kết quả lọc (dùng cho Grid)
  const filteredFruits = useMemo(() => {
    if (query.trim() === '') return [];

    return fruitData.filter(item =>
      item.vietnamese.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm trái cây</Text>

      {/* Ô tìm kiếm + Autocomplete dropdown */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Nhập tên trái cây (ví dụ: táo, chuối...)"
          value={query}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Dropdown gợi ý */}
        {showSuggestions && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={item => item.id}
            style={styles.suggestionsList}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>

      {/* Spinner */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={styles.spinner}
        />
      )}

      {/* Grid kết quả */}
      {!loading && filteredFruits.length > 0 ? (
        <FlatList
          data={filteredFruits}
          renderItem={renderFruitItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        !loading &&
        query.length > 0 && (
          <Text style={styles.noResult}>Không tìm thấy trái cây phù hợp</Text>
        )
      )}

      {/* Hint */}
      {query.length === 0 && !loading && (
        <Text style={styles.hint}>Gõ tên trái cây để xem gợi ý...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginVertical: 16,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 10, // Để dropdown nổi lên
  },
  searchInput: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#81C784',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionsList: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    maxHeight: 220,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    zIndex: 20,
    elevation: 5,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  suggestionLatin: {
    color: '#757575',
    fontSize: 14,
  },
  spinner: {
    marginVertical: 40,
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 20,
  },
  fruitCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  fruitImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  fruitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
  },
  fruitLatin: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
    marginTop: 40,
  },
  hint: {
    textAlign: 'center',
    fontSize: 15,
    color: '#9E9E9E',
    marginTop: 40,
  },
});

export default StyleSheetSpinner;