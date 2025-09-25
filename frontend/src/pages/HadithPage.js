import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Book, Copy, ChevronLeft, ChevronRight } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HadithPage = () => {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [hadithData, setHadithData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      loadCollections();
    }, []);

    const loadCollections = async () => {
      try {
        const response = await axios.get(`${API}/hadith/collections`);
        setCollections(response.data.collections || []);
      } catch (error) {
        console.error('Error loading collections:', error);
        toast.error('Failed to load Hadith collections');
      }
    };

    const loadHadith = async (collectionName, page = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/hadith/${collectionName}?page=${page}&limit=20`);
        setHadithData(response.data);
        setSelectedCollection(collectionName);
        setCurrentPage(page);
      } catch (error) {
        console.error('Error loading hadith:', error);
        toast.error('Failed to load Hadith');
      }
      setLoading(false);
    };

    const copyHadith = (text) => {
      navigator.clipboard.writeText(text);
      toast.success('Hadith copied to clipboard');
    };

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Hadith Collections</h2>
            <p className="text-gray-600">Authentic sayings and traditions of Prophet Muhammad ﷺ</p>
          </div>
          {selectedCollection && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCollection(null);
                setHadithData(null);
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Collections
            </Button>
          )}
        </div>

        {!selectedCollection ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card
                key={collection.name}
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm"
                onClick={() => loadHadith(collection.name)}
              >
                <CardContent className="p-6 text-center">
                  <Book className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{collection.title}</h3>
                  <p className="text-gray-600">Authentic Hadith Collection</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Loading Hadith...</p>
            </CardContent>
          </Card>
        ) : hadithData ? (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardContent className="p-8 text-center">
                <h1 className="text-3xl font-bold mb-2">
                  {collections.find(c => c.name === selectedCollection)?.title}
                </h1>
                <p className="text-emerald-100">Authentic Hadith Collection</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {hadithData.hadiths?.map((hadith, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">Hadith {hadith.hadithNumber || index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyHadith(hadith.hadithEnglish || hadith.text || hadith.english)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {hadith.hadithArabic && (
                        <p className="text-xl font-arabic text-right leading-loose text-gray-900">
                          {hadith.hadithArabic}
                        </p>
                      )}
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {hadith.hadithEnglish || hadith.text || hadith.english}
                      </p>
                      {hadith.narrator && (
                        <p className="text-sm text-gray-500 italic">
                          Narrator: {hadith.narrator}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-600">No hadith available for this collection</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => loadHadith(selectedCollection, currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <span className="font-semibold">
                Page {currentPage}
              </span>
              <Button
                variant="outline"
                disabled={!hadithData || hadithData.hadiths?.length < 20}
                onClick={() => loadHadith(selectedCollection, currentPage + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  export default HadithPage;