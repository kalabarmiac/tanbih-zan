import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Copy, ChevronLeft } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const QuranPage = () => {
    const [surahs, setSurahs] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [surahData, setSurahData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      loadSurahs();
    }, []);

    const loadSurahs = async () => {
      try {
        const response = await axios.get(`${API}/quran/surahs`);
        setSurahs(response.data.data || []);
      } catch (error) {
        console.error('Error loading surahs:', error);
        toast.error('Failed to load Quran chapters');
      }
    };

    const loadSurah = async (surahNumber) => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/quran/surah/${surahNumber}`);
        setSurahData(response.data.data);
        setSelectedSurah(surahNumber);
      } catch (error) {
        console.error('Error loading surah:', error);
        toast.error('Failed to load Surah');
      }
      setLoading(false);
    };

    const copyVerse = (arabic, english) => {
      const text = `${arabic}\n\n${english}`;
      navigator.clipboard.writeText(text);
      toast.success('Verse copied to clipboard');
    };

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Holy Quran</h2>
            <p className="text-gray-600">Read and reflect upon Allah's words</p>
          </div>
          {selectedSurah && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedSurah(null);
                setSurahData(null);
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Chapters
            </Button>
          )}
        </div>

        {!selectedSurah ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surahs.map((surah) => (
              <Card
                key={surah.number}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm"
                onClick={() => loadSurah(surah.number)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      {surah.number}
                    </div>
                    <Badge variant={surah.revelationType === 'Meccan' ? 'default' : 'secondary'}>
                      {surah.revelationType}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{surah.englishName}</h3>
                  <p className="text-2xl font-arabic text-emerald-600 mb-2">{surah.name}</p>
                  <p className="text-gray-600 text-sm">{surah.englishNameTranslation}</p>
                  <p className="text-gray-500 text-sm mt-2">{surah.numberOfAyahs} verses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Loading Surah...</p>
            </CardContent>
          </Card>
        ) : surahData ? (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardContent className="p-8 text-center">
                <h1 className="text-4xl font-bold mb-2">{surahData.englishName}</h1>
                <p className="text-3xl font-arabic mb-2">{surahData.name}</p>
                <p className="text-emerald-100">{surahData.englishNameTranslation}</p>
                <div className="flex justify-center items-center space-x-4 mt-4 text-sm">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {surahData.revelationType}
                  </Badge>
                  <span>{surahData.numberOfAyahs} Verses</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {surahData.ayahs.map((ayah) => (
                <Card key={ayah.number} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">{ayah.numberInSurah}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyVerse(ayah.arabic, ayah.english)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <p className="text-2xl font-arabic text-right leading-loose text-gray-900">
                        {ayah.arabic}
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {ayah.english}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  export default QuranPage;