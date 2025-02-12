"use client";
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { App } from 'antd';
import { ProductRecord, StorageRequestsResponse } from '../types';
import { getStorageRequests, approveRequests, rejectRequests } from '../api/list';

export const useList = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const [dataSource, setDataSource] = useState<ProductRecord[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasIncoming, setHasIncoming] = useState(false);
  const [hasOutgoing, setHasOutgoing] = useState(false);

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/storage-requests', title: 'Заявки на склад' },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: StorageRequestsResponse = await getStorageRequests();
      
      // Проверяем наличие данных в каждом массиве
      setHasIncoming(response.incomings && response.incomings.length > 0);
      setHasOutgoing(response.outgoings && response.outgoings.length >= 0);

      const allRequests = [
        ...response.incomings.map(item => ({
          ...item,
          type: 'incoming' as const,
          status: item.status || 'not_verified'
        })),
        ...response.outgoings.map(item => ({
          ...item,
          type: 'outgoing' as const,
          status: item.status || 'not_verified'
        }))
      ];
      setDataSource(allRequests);
    } catch (error) {
      console.error('Error fetching storage requests:', error);
      message.error('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApprove = useCallback(async () => {
    try {
      if (selectedRowKeys.length === 0) {
        message.warning('Выберите заявки для подтверждения');
        return;
      }

      const selectedIds = selectedRowKeys.map(Number);
      
      // Находим выбранные элементы
      const selectedItems = dataSource.filter(item => selectedIds.includes(item.id));
      
      // Разделяем ID по типу заявок
      const payload = {
        incoming_ids: selectedItems
          .filter(item => !item.type || item.type === 'incoming')
          .map(item => item.id),
        outgoing_ids: selectedItems
          .filter(item => item.type === 'outgoing')
          .map(item => item.id)
      };

      console.log('Selected items:', selectedItems);
      console.log('Final payload:', payload);

      await approveRequests(payload);
      await fetchData();
      message.success('Заявки успешно приняты');
      setSelectedRowKeys([]);
    } catch (error) {
      console.error('Error approving requests:', error);
      message.error('Ошибка при принятии заявок');
    }
  }, [selectedRowKeys, dataSource, fetchData, message]);

  const handleReject = useCallback(async () => {
    try {
      if (selectedRowKeys.length === 0) {
        message.warning('Выберите заявки для отклонения');
        return;
      }

      const selectedIds = selectedRowKeys.map(Number);
      
      // Находим выбранные элементы
      const selectedItems = dataSource.filter(item => selectedIds.includes(item.id));
      
      // Разделяем ID по типу заявок
      const payload = {
        incoming_ids: selectedItems
          .filter(item => !item.type || item.type === 'incoming')
          .map(item => item.id),
        outgoing_ids: selectedItems
          .filter(item => item.type === 'outgoing')
          .map(item => item.id)
      };

      console.log('Selected items:', selectedItems);
      console.log('Final payload:', payload);

      await rejectRequests(payload);
      await fetchData();
      message.success('Заявки успешно отклонены');
      setSelectedRowKeys([]);
    } catch (error) {
      console.error('Error rejecting requests:', error);
      message.error('Ошибка при отклонении заявок');
    }
  }, [selectedRowKeys, dataSource, fetchData, message]);

  return {
    selectedRowKeys,
    setSelectedRowKeys,
    loading,
    dataSource,
    fetchData,
    handleApprove,
    handleReject,
    hasIncoming,
    hasOutgoing,
    breadcrumbData
  };
};

export default useList;
export const use = useList;