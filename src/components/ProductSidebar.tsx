import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { slugify } from '../utils/slugify';

interface Product {
  ID: string;
  Name: string;
  Category: string;
  Jenis: string;
  Anak: string;
}

interface CategoryStructure {
  [category: string]: {
    [jenis: string]: {
      [anak: string]: Product[];
    };
  };
}

const ProductSidebar = () => {
  const [productStructure, setProductStructure] = useState<CategoryStructure>({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('ID, Name, Category, Jenis, Anak')
          .order('Category')
          .order('Jenis')
          .order('Anak')
          .order('Name');

        if (error) throw error;

        // Organize products into nested structure
        const structure: CategoryStructure = {};
        data?.forEach((product) => {
          const category = product.Category || 'Uncategorized';
          const jenis = product.Jenis || 'Other';
          const anak = product.Anak || 'General';

          if (!structure[category]) {
            structure[category] = {};
          }
          if (!structure[category][jenis]) {
            structure[category][jenis] = {};
          }
          if (!structure[category][jenis][anak]) {
            structure[category][jenis][anak] = [];
          }
          structure[category][jenis][anak].push(product);
        });

        setProductStructure(structure);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-4 rounded-box shadow-lg">
      <h2 className="text-xl font-bold mb-4">Product Categories</h2>
      <div className="space-y-4">
        {Object.entries(productStructure).map(([category, jenisGroup]) => (
          <div key={category} className="collapse collapse-plus bg-base-200">
            <input type="checkbox" defaultChecked /> 
            <div className="collapse-title font-medium">
              {category}
            </div>
            <div className="collapse-content">
              {Object.entries(jenisGroup).map(([jenis, anakGroup]) => (
                <div key={jenis} className="ml-2 mb-2">
                  <div className="collapse collapse-arrow">
                    <input type="checkbox" defaultChecked={location.pathname.includes(slugify(jenis))} />
                    <div className="collapse-title text-sm font-medium">
                      {jenis}
                    </div>
                    <div className="collapse-content">
                      {Object.entries(anakGroup).map(([anak, products]) => (
                        <div key={anak} className="ml-2 mb-2">
                          <div className="text-sm font-medium opacity-75 mb-1">{anak}</div>
                          <ul className="menu menu-sm">
                            {products.map((product) => (
                              <li key={product.ID}>
                                <Link 
                                  to={`/product/${slugify(product.Name)}`}
                                  className={`text-sm ${location.pathname === `/product/${slugify(product.Name)}` ? 'active' : ''}`}
                                >
                                  {product.Name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSidebar;