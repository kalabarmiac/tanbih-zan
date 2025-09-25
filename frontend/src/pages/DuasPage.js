import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Copy } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DuasPage = () => {
    const [duas, setDuas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
      loadDuas();
    }, []);

    const loadDuas = async () => {
      try {
        const response = await axios.get(`${API}/duas`);
        setDuas(response.data.duas || []);
      } catch (error) {
        console.error('Error loading duas:', error);
        toast.error('Failed to load Duas');
      }
    };

    const copyDua = (arabic, english, transliteration) => {
      const text = `${arabic}\n\n${english}\n\nTransliteration: ${transliteration}`;
      navigator.clipboard.writeText(text);
      toast.success('Dua copied to clipboard');
    };

    const categories = ['all', 'daily', 'emotional', 'worship'];
    const filteredDuas = selectedCategory === 'all'
      ? duas
      : duas.filter(dua => dua.category === selectedCategory);

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Islamic Duas</h2>
          <p className="text-gray-600">Supplications and prayers for daily life</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDuas.map((dua) => (
            <Card key={dua.id} className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900">{dua.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      {dua.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyDua(dua.arabic, dua.english, dua.transliteration)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-arabic text-right leading-loose text-gray-900 p-4 bg-emerald-50 rounded-lg">
                  {dua.arabic}
                </div>
                <div className="space-y-2">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>Translation:</strong> {dua.english}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    <strong>Transliteration:</strong> {dua.transliteration}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  export default DuasPage;